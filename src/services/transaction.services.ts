import BaseServices from "./base.services";
import Transaction from "../models/transaction.model";
import TransSubCate from "../models/trans.subcate.model";
import dataSource from "../database/data-source";
import WalletServices from "./wallet.services";
import TransSubCateServices from "./transsubcate.services";
import {Between} from "typeorm";

let transactionRepo = dataSource.getRepository(Transaction);
let transSubCateRepo = dataSource.getRepository(TransSubCate);

const [INCOME, EXPENSE] = ["Income", "Expense"];
const [OTHER_INCOME_ID, OTHER_EXPENSE_ID] = [34, 20];

class TransactionServices extends BaseServices {

  static async getTransactions(userId,data) {
    let myDate = ''
    let query = await transactionRepo.createQueryBuilder('trans')
      .innerJoin('trans.wallet', 'wallet')
      .innerJoin('wallet.user', 'user')
      .innerJoin('trans.subCategory', 'subCategory')
      .innerJoin('subCategory.category', 'category')
      .innerJoin('category.transType', 'type')
      .select('trans.money, trans.date, trans.note, trans.id')
      .addSelect('wallet.name', 'wallet_name')
      .addSelect('subCategory.id', 'subCate_id')
      .addSelect('wallet.id', 'wallet_id')
      .addSelect('subCategory.name', 'subCate_name')
      .addSelect('type.name', 'type_name')
      .where('user.id = :id', { id: userId })
    if (!data.startDate) {
      if (data.date) {
        if (data.date === '') {
          myDate = `${data.year}-${data.month}%`
        } else {
          myDate = `${data.year}-${data.month}-${data.date}%`
        }
        query = query.andWhere('trans.date LIKE :date', {date: myDate})
      } else {
        myDate = `${data.year}-${data.month}%`
        query = query.andWhere('trans.date LIKE :date', {date: myDate})
      }
    } else {
      let start = data.startDate.split('/').reverse().join('-')
      let end = data.endDate.split('/').reverse().join('-')
      query = query.andWhere('trans.date >= :startDate', {startDate: start})
        .andWhere('trans.date <= :endDate', {endDate: end})
    }
    return query
      .getRawMany()
      .then((trans) => {
        let arr = [];
        let dates = trans.map(tran => {return tran.date.toString()})
        let uniqueDate = Array.from(new Set(dates))
        for (let i = 0; i < uniqueDate.length; i++) {
          let obj = {
            date: uniqueDate[i],
            sum: 0,
            transOfDate: []
          }
          for (let j = 0; j < trans.length; j++) {
            if (trans[j].date.toString() === uniqueDate[i]) {
              obj.transOfDate.push(trans[j])
              if (trans[j].type_name === 'Income') {
                obj.sum += trans[j].money
              } else {
                obj.sum -= trans[j].money
              }
            }
          }
          arr.push(obj)
        }
        return arr.sort((a: any, b: any) => {
          return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
      })
  }

  static async getTransactionsOfWallet(walletId, data) {
    let myDate = ''
    let query = await transactionRepo.createQueryBuilder('trans')
      .innerJoin('trans.wallet', 'wallet')
      .innerJoin('wallet.user', 'user')
      .innerJoin('trans.subCategory', 'subCategory')
      .innerJoin('subCategory.category', 'category')
      .innerJoin('category.transType', 'type')
      .select('trans.money, trans.date, trans.note, trans.id')
      .addSelect('wallet.name', 'wallet_name')
      .addSelect('subCategory.id', 'subCate_id')
      .addSelect('wallet.id', 'wallet_id')
      .addSelect('subCategory.name', 'subCate_name')
      .addSelect('type.name', 'type_name')
      .where('wallet.id = :id', { id: walletId })
    if (!data.startDate) {
      if (data.date) {
        if (data.date === '') {
          myDate = `${data.year}-${data.month}%`
        } else {
          myDate = `${data.year}-${data.month}-${data.date}%`
        }
        query = query.andWhere('trans.date LIKE :date', {date: myDate})
      } else {
        myDate = `${data.year}-${data.month}%`
        query = query.andWhere('trans.date LIKE :date', {date: myDate})
      }
    } else {
      let start = data.startDate.split('/').reverse().join('-')
      let end = data.endDate.split('/').reverse().join('-')
      query = query.andWhere('trans.date >= :startDate', {startDate: start})
        .andWhere('trans.date <= :endDate', {endDate: end})
    }
    return query
      .getRawMany()
      .then((trans) => {
        let arr = [];
        let dates = trans.map(tran => {return tran.date.toString()})
        let uniqueDate = Array.from(new Set(dates))
        for (let i = 0; i < uniqueDate.length; i++) {
          let obj = {
            date: uniqueDate[i],
            sum: 0,
            transOfDate: []
          }
          for (let j = 0; j < trans.length; j++) {
            if (trans[j].date.toString() === uniqueDate[i]) {
              obj.transOfDate.push(trans[j])
              if (trans[j].type_name === 'Income') {
                obj.sum += trans[j].money
              } else {
                obj.sum -= trans[j].money
              }
            }
          }
          arr.push(obj)
        }
        return arr.sort((a: any, b: any) => {
          return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
      })
  }

  static async getTransactionsByTypeName(userId, data) {
    let myDate = ''
    let query = await transactionRepo.createQueryBuilder('trans')
      .innerJoin('trans.wallet', 'wallet')
      .innerJoin('wallet.user', 'user')
      .innerJoin('trans.subCategory', 'subCategory')
      .innerJoin('subCategory.category', 'category')
      .innerJoin('category.transType', 'type')
      .select('trans.money, trans.date, trans.note, trans.id')
      .addSelect('wallet.name', 'wallet_name')
      .addSelect('subCategory.id', 'subCate_id')
      .addSelect('wallet.id', 'wallet_id')
      .addSelect('subCategory.name', 'subCate_name')
      .addSelect('type.name', 'type_name')
      .where('user.id = :id', { id: userId })
    if (!data.startDate) {
      if (data.date === '') {
        myDate = `${data.year}-${data.month}%`
      } else {
        myDate = `${data.year}-${data.month}-${data.date}%`
      }
      query = query.andWhere('trans.date LIKE :date', {date: myDate})
    } else {
      let start = data.startDate.split('/').reverse().join('-')
      let end = data.endDate.split('/').reverse().join('-')
      query = query.andWhere('trans.date >= :startDate', {startDate: start})
        .andWhere('trans.date <= :endDate', {endDate: end})
    }
    return query
      .andWhere('type.name = :name', {name: data.typeName})
      .getRawMany()
      .then(trans => {
        let arr = []
        let names = Array.from(new Set(trans.map(tran => {return tran.subCate_name})));
        for (let i = 0; i < names.length; i++) {
          let obj = {
            subCate_name: names[i],
            sum: 0,
            trans: []
          }
          for (let j = 0; j < trans.length; j++) {
            if (trans[j].subCate_name === names[i]) {
              obj.trans.push(trans[j])
              if (trans[j].type_name === 'Income') {
                obj.sum += trans[j].money
              } else {
                obj.sum -= trans[j].money
              }
            }
          }
          let newTrans = []
          let dates = obj.trans.map(tran => {return tran.date.toString()})
          let uniqueDate = Array.from(new Set(dates))
          for (let a = 0; a < uniqueDate.length; a++) {
            let newObj = {
              date: uniqueDate[a],
              sum: 0,
              transOfDate: []
            }
            for (let b = 0; b < obj.trans.length; b++) {
              if (obj.trans[b].date.toString() === uniqueDate[a]) {
                newObj.transOfDate.push(obj.trans[b])
                if (obj.trans[b].type_name === 'Income') {
                  newObj.sum += obj.trans[b].money
                } else {
                  newObj.sum -= obj.trans[b].money
                }
              }
            }
            newTrans.push(newObj)
          }
          obj.trans = newTrans.sort((a: any, b: any) => {
            return new Date(b.date).valueOf() - new Date(a.date).valueOf()
          })
          arr.push(obj)
        }
        return arr
      })
  }

  static async getTransactionsByTypeNameOfWallet(walletId, data) {
    let myDate = ''
    let query = await transactionRepo.createQueryBuilder('trans')
      .innerJoin('trans.wallet', 'wallet')
      .innerJoin('wallet.user', 'user')
      .innerJoin('trans.subCategory', 'subCategory')
      .innerJoin('subCategory.category', 'category')
      .innerJoin('category.transType', 'type')
      .select('trans.money, trans.date, trans.note, trans.id')
      .addSelect('wallet.name', 'wallet_name')
      .addSelect('subCategory.id', 'subCate_id')
      .addSelect('wallet.id', 'wallet_id')
      .addSelect('subCategory.name', 'subCate_name')
      .addSelect('type.name', 'type_name')
      .where('wallet.id = :id', { id: walletId })
    if (!data.startDate) {
      if (data.date === '') {
        myDate = `${data.year}-${data.month}%`
      } else {
        myDate = `${data.year}-${data.month}-${data.date}%`
      }
      query = query.andWhere('trans.date LIKE :date', {date: myDate})
    } else {
      let start = data.startDate.split('/').reverse().join('-')
      let end = data.endDate.split('/').reverse().join('-')
      query = query.andWhere('trans.date >= :startDate', {startDate: start})
        .andWhere('trans.date <= :endDate', {endDate: end})
    }
    return query
      .andWhere('type.name = :name', {name: data.typeName})
      .getRawMany()
      .then(trans => {
        let arr = []
        let names = Array.from(new Set(trans.map(tran => {return tran.subCate_name})));
        for (let i = 0; i < names.length; i++) {
          let obj = {
            subCate_name: names[i],
            sum: 0,
            trans: []
          }
          for (let j = 0; j < trans.length; j++) {
            if (trans[j].subCate_name === names[i]) {
              obj.trans.push(trans[j])
              if (trans[j].type_name === 'Income') {
                obj.sum += trans[j].money
              } else {
                obj.sum -= trans[j].money
              }
            }
          }
          let newTrans = []
          let dates = obj.trans.map(tran => {return tran.date.toString()})
          let uniqueDate = Array.from(new Set(dates))
          for (let a = 0; a < uniqueDate.length; a++) {
            let newObj = {
              date: uniqueDate[a],
              sum: 0,
              transOfDate: []
            }
            for (let b = 0; b < obj.trans.length; b++) {
              if (obj.trans[b].date.toString() === uniqueDate[a]) {
                newObj.transOfDate.push(obj.trans[b])
                if (obj.trans[b].type_name === 'Income') {
                  newObj.sum += obj.trans[b].money
                } else {
                  newObj.sum -= obj.trans[b].money
                }
              }
            }
            newTrans.push(newObj)
          }
          obj.trans = newTrans.sort((a: any, b: any) => {
            return new Date(b.date).valueOf() - new Date(a.date).valueOf()
          })
          arr.push(obj)
        }
        return arr
      })
  }

  static async deleteTransaction(transaction: Transaction): Promise<void> {
    await transactionRepo.remove(transaction);
  };

  static async getTransactionById(transactionId: number): Promise<Transaction> {
    let transaction = await transactionRepo.createQueryBuilder("transaction")
      .innerJoinAndSelect("transaction.wallet", "wallet")
      .where("transaction.id = :id", { id: transactionId })
      .getOne();
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return transaction;
  }

  static async addTransaction(walletId, subcategoryId, money, date, image, note): Promise<void> {
    let wallet = await WalletServices.getWalletById(walletId);
    let subcategory = await TransSubCateServices.getSubCateById(subcategoryId);
    let transaction = new Transaction();

    transaction.wallet = wallet;
    transaction.subCategory = subcategory;
    transaction.money = money ? Number(money) : null;
    transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
    transaction.image = image;
    transaction.note = note;
    console.log(transaction.date)

    await transactionRepo.save(transaction);
  }

  static async updateTransaction(transactionId, { walletId, subcategoryId, money, date, image, note }): Promise<void> {
    let transaction = await this.getTransactionById(transactionId);
    let wallet = await WalletServices.getWalletById(walletId);
    let subcategory = await TransSubCateServices.getSubCateById(subcategoryId);

    transaction.wallet = wallet;
    transaction.subCategory = subcategory;
    transaction.money = money ? +money : null;
    transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
    transaction.image = image;
    transaction.note = note;

    await transactionRepo.save(transaction);
  }
  static async addTransactionToAdjustBalance(userId: number, walletId: number, balance: number): Promise<void> {
    let wallet = await WalletServices.getWalletById(walletId);
    let subcategoryName = balance > wallet.balance ? "Other Income" : "Other Expense";
    let subcategory = await transSubCateRepo.findOneBy({
      name: subcategoryName,
      user: {
        id: userId
      }
    })
    let money = Math.abs(balance - wallet.balance);
    await this.addTransaction(walletId, subcategory.id, money, new Date(), null, "Adjust Balance");
  }

  static async getTransactionOfUserByTime(walletId: number, startDate: string, endDate:string): Promise<any[]> {
    return await transactionRepo.find({
      where: {
        wallet: {
          id: walletId
        },
        date: Between(
            new Date(startDate),
            new Date(endDate)
        ),
      },
      relations: {
        subCategory: true,
      },

    })
  }

}

export default TransactionServices;