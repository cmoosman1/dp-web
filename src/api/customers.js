import axios from "axios";

export default {
  getCustomerBySearchTerm: searchTerm =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Common/GetAllCustomers/?pageSize=10000&currentPage=1&searchText=${searchTerm}`
    ),
  getCustomerProfileById: (id, market) =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Common/GetCustomerProfile?traximizeCustomerID=${id}&market=${market}`
    ),
  getCustomerProfileByMarket: market =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Common/GetCustomerPriceGroups?market=${market}`
    ),
  getCustomerPriceGroupsByMarket: market => 
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Common/GetCustomerPriceGroups?market=${market}`
    ),
  getCustomerRetailPriceGroupsByMarket: market =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Common/GetCustomerRetailPriceGroups?market=${market}`
    )
};
