import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieSession from "cookie-session";
import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import AuthMiddleware from "./middlewares/auth.middlewares";
import WalletRouter from "./routers/wallet.router";
import UserRouter from "./routers/user.router";
import dataSource from "./database/data-source";
import Transaction from "./models/transaction.model";
import TransTypeRouter from "./routers/transtype.router";
import TransactionRouter from "./routers/transcation.router";
import TransCateRouter from "./routers/transcate.router";
import TransSubCateRouter from "./routers/transsubcate.router";
class App {
  private app: express.Application = express();

  private appConfig = new AppConfig();

  constructor() {
    this.bootstrap();
  }

  public bootstrap(): void {
    this.setupMiddlewares();
    // this.serveStaticFiles();
    this.listen();
  }

  // Static  files
  /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */

  private setupMiddlewares(): void {
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cookieSession({
        name: "session",
        keys: [this.appConfig.sessionKey],
        maxAge: this.appConfig.sessionMaxAge,
      })
    );
    this.app.use(
      cors({
        credentials: true,
        origin: this.appConfig.baseURL,
        methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
      })
    );

    // Test

    this.app.use('/test', async (req, res) => {
      let transactionRepo = dataSource.getRepository(Transaction)
      let result = await transactionRepo.createQueryBuilder('trans')
          .where('trans.date >= :startDate', {startDate: '2023-02-22'})
          .getMany()
      res.json(result)
    })

    //

    this.app.use("/api/auth", AuthRouter);
    this.app.use(AuthMiddleware.checkAuthentication);
    this.app.use("/api/wallet", WalletRouter);
    this.app.use("/api/transaction-subcategory", TransSubCateRouter);
    this.app.use("/api/transaction-category", TransCateRouter);
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/transaction", TransactionRouter);
    this.app.use("/api/type", TransTypeRouter);
  }

  private listen(): void {
    this.app.listen(this.appConfig.port, () => {
      console.log(`server started at http://localhost:${this.appConfig.port}`);
    });
  }
}

// tslint:disable-next-line:no-unused-expression
new App();


//npm run dev:start