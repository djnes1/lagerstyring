import Van from "../models/van.js";
import Product from "../models/product.js";

import {
  addProductToDb,
  addVanToDb,
  getVanFromDb,
  updateVan,
  addCompanyToDb,
  addUserToDb,
  updateUser,
  getProductsFromDb,
  getVansFromDb,
  getProductFromDb,
  deleteProductFromDb,
  getProductAmount,
  setProductAmount,
  deleteVanFromDb,
  getUsersFromDb,
  deleteUserFromDb,
  getUser,
  updateAssignedUserToVan,
  updateAssignedVanToUser,
  getUserFromDb,
} from "../database/Firestore.js";
import Company from "../models/company.js";
import User from "../models/user.js";

export default class Controller {

  //--------------------Company-------------------------------------------------------------------------------------------------------------------
  async createCompany(name, cvr, contactpersonName, contactpersonNumber) {
    const company = new Company(
      name,
      cvr,
      contactpersonName,
      contactpersonNumber
    );

    await addCompanyToDb(company);
    return company;
  }

  //--------------------Products-----------------------------------------------------------------------------------------------------------------

  async createProduct(name, productID, amount, unit, licensePlate) {
    const product = new Product(name, productID, amount, unit, licensePlate);
    await addProductToDb(product);
    return product;
  }

  async getProduct(productId) {
    const product = getProductFromDb(productId);
    return product;
  }

  async getProducts() {
    const products = await getProductsFromDb();
    return products;
  }

  async getProductAmount(productId) {
    return await getProductAmount(productId);
  }

  async adjustProductAmount(productId, amount) {
    let productAmount = await getProductAmount(productId);
    if (productAmount + amount < 0) {
      productAmount = 0;
    } else {
      productAmount += amount;
    }
    await setProductAmount(productId, productAmount);
    return productAmount;
  }

  async deleteProduct(productId, licensePlate) {
    await deleteProductFromDb(productId, licensePlate);
  }

  //--------------------Vans-------------------------------------------------------------------------------------------------------------------------

  async createVan(vanNumber, licensePlate) {
    const van = new Van(vanNumber, licensePlate);
    await addVanToDb(van)
    return van
  }

  async getVan(licensePlate) {
    const vanData = await getVanFromDb(licensePlate);
    const v = new Van(vanData.vanNumber, vanData.licensePlate);
    return vanData;
  }

  async getVans() {
    const vansData = await getVansFromDb();
    return vansData;
  }

  async addProductToVan(product, van) {
    await updateVan(van, product.productId);
  }

  async getVanProducts(licensePlate) {
    const van = await getVanFromDb(licensePlate);
    const vanProductIds = van.products;
    const allProducts = await getProductsFromDb();

    const vanProducts = allProducts.filter((p) =>
      vanProductIds.includes(p.productId)
    );

    return vanProducts;
  }

  async updateVan(documentPath, employeeId){
    let newUserName = employeeId
    const newUserEmployeeId = employeeId

    const van = await getVanFromDb(documentPath)
    const currentVanEmployeeId = van.userEmployeeId

    if(currentVanEmployeeId != newUserEmployeeId && currentVanEmployeeId != undefined){
      const emptyVan = ""
      await updateAssignedVanToUser(currentVanEmployeeId, emptyVan)
    }

    if(!employeeId == ""){
      newUserName = await getUserFromDb(employeeId)
    }
    await updateAssignedUserToVan(documentPath, newUserName, newUserEmployeeId)
  }

  async deleteVan(licensePlate) {
    await deleteVanFromDb(licensePlate);
  }

  //--------------------Users------------------------------------------------------------------------------------------------------------------------

  async createUser(name, employeeId, username, password, role) {
    const user = new User(name, employeeId, username, password, role);
    await addUserToDb(user);
    return user;
  }

  async getUsers() {
    const usersData = await getUsersFromDb();
    return usersData;
  }

  async getUserVan(employeeId) {
    const user = await getUser(employeeId);
    let van = undefined
    if (user.van) {
      van = await getVanFromDb(user.van);
    }
    return van;
  }

  async updateUser(documentPath, newVan){
    const user = await getUser(documentPath)
    const currentUserVan = user.van

    if(currentUserVan != newVan && currentUserVan != undefined){
      const emptyUser = ""
      const emptyUserEmployeeId = ""
      await updateAssignedUserToVan(currentUserVan, emptyUser, emptyUserEmployeeId)
    }

    await updateAssignedVanToUser(documentPath, newVan)
  }

  async deleteUser(employeeId) {
    await deleteUserFromDb(employeeId);
  }

}

