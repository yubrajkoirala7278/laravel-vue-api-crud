<script setup>
import { useRoute } from "vue-router";
import { reactive, onMounted, computed } from "vue";
import { useProducts } from "../store";

// ====get id from url======
const route = useRoute();
const slug = route.params.slug;
// =========================

// ========fetch products=========
const productStore = useProducts();
const filter = reactive({
    productSlug: slug,
});
onMounted(() => {
    productStore.fetchSingleProduct(filter.productSlug);
});
const product = computed(() => productStore.singleProduct);
// ========================================
</script>
<template>
    <h1>Title: {{ product.name }}</h1>
    <p>Price: {{ product.price }}</p>
    <p>Description: {{ product.description }}</p>
    <p>Category: {{ product.cross_price }}</p>
    <p>Category: {{ product.color }}</p>
    <v-img :width="300" aspect-ratio="16/9" cover :src="product.image_url"></v-img>
</template>