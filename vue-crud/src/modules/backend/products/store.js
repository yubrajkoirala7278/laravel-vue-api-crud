import { defineStore } from "pinia";
import { ref } from "vue";
import {
  fetchProductsApi,
  deleteProductApi,
  addProductApi,
  fetchSingleProductsApi,
  updateProductApi,
} from "./service";

export const useProducts = defineStore("products", () => {
  // ===========reactive state====================
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const singleProduct = ref({});
  const totalProducts=ref(null);
  const newProduct=ref(null);
  // ============================================

  // ============FETCH(GET) Product with filter==========
  const fetchProducts = async (productFilter) => {
    try {
      isLoading.value = true;
      const apiData = await fetchProductsApi(productFilter);
      totalProducts.value=apiData.data.meta.total;
      products.value = apiData.data.data.map((item, index) => {
        return { sno: '#', ...item };
      });
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };
  // ====================================================

  // ===============DELETE==============================
  const deleteProduct = async (slug) => {
    try {
      await deleteProductApi(slug);
    } catch (error) {
      console.log(error);
    }
  };
  // ===================================================

  // =========POST(ADD PRODUCT)========================
  const addProduct = async (data) => {
    try {
      const response = await addProductApi(data);
      newProduct.value=response.data.data;
    } catch (error) {
      return false;
    }
  };
  // ==================================================

  // ============FETCH(GET) Single Product with id==========
  const fetchSingleProduct = async (slug) => {
    try {
      isLoading.value = true;
      const apiData = await fetchSingleProductsApi(slug);
      singleProduct.value = apiData.data.data;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };
  // ====================================================

  // ================UPDATE(PUT)============================
  const updateProduct=async(data,slug)=>{
    try{
        let response=await updateProductApi(data,slug);
        return response.data.data;
    }catch(err){
        error.value=err;
    }
    }
  // =======================================================

  // ==========return all the method and values=========
  return {
    isLoading,
    error,
    fetchProducts,
    products,
    deleteProduct,
    addProduct,
    fetchSingleProduct,
    singleProduct,
    updateProduct,
    totalProducts,
    newProduct
  };
  // ===================================================
});