<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useProducts } from "./store";
import { storeToRefs } from "pinia";
import { headers } from "./utils.js";
// ========setup=========
const productStore = useProducts();
const products = computed(() => productStore.products);
// ========================================

// =========fetch, pagination and filter products=============
const filter = reactive({
    sortBy: [],
    perPage: 10,
    page: 1,
});
let timeOutId = null;
function loadItems({ page, itemsPerPage }) {
    clearTimeout(timeOutId);
    filter.perPage = itemsPerPage;
    filter.page = page;
    timeOutId = setTimeout(() => {
        productStore.fetchProducts(filter);
    }, 2000);
}
// ==============================================

// =======Add Product======================
const disableSubmitBtn = ref(false);
const product = reactive({
    slug: null,
    name: null,
    image: null,
    price: null,
    cross_price: null,
    description: null,
    color: null,
});
// rules
const rules = {
    required: (v) => !!v || "Required",
    price: (v) => (!!v && v > 10) || "Amount must be greater than 10",
};
// generate automatic slug from name of product
watch(
    () => product.name,
    (newValue) => {
        product.slug = generateSlug(newValue);
    }
);

function generateSlug(text) {
    if (text != null) {
        return text.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return null;
}

// submit form if validated
const productForm = ref(null);
const dialog = ref(false);
const btnName = ref("");
const { valid } = storeToRefs(productForm);
function submit() {
    productForm.value.validate().then(async ({ valid }) => {
        if (valid) {
            disableSubmitBtn.value = true;
            if (btnName.value == "Submit") {
                // ----------add product-----------
                let response = await productStore.addProduct(product);
                // append in frontend
                if (response != false) {
                    products.value.unshift({ sno: "#", ...productStore.newProduct });
                    dialog.value = false;
                }
            } else {
                // ----------update product-----------
                let response = await productStore.updateProduct(
                    product,
                    productSlug.value
                );
                // update in frontend
                if (response != false) {
                    productStore.products = productStore.products.map((currProduct) => {
                        if (currProduct.slug == productSlug.value) {
                            return { sno: "#", ...response }; // Replace the object with updatedObject
                        }
                        return currProduct; // Keep the original object if it doesn't match the ID
                    });
                    dialog.value = false;
                }
            }
            disableSubmitBtn.value = false;
        }
    });
}
// reset form
const resetForm = () => {
    Object.assign(product, {
        slug: null,
        name: null,
        image: null,
        price: null,
        cross_price: null,
        description: null,
        color: null,
    });
};

// ========================================

// ======Delete Product====================
async function deleteProducts(slug) {
    var result = confirm("Want to delete?");
    if (result) {
        await productStore.deleteProduct(slug);
        productStore.products = productStore.products.filter((currProduct) => {
            return currProduct.slug != slug;
        });
    }
}
// ========================================

//============Display current row value in form for updation=========
const productSlug = ref(null);
function updateForm(item) {
    Object.assign(product, {
        slug: item.slug,
        name: item.name,
        price: item.price,
        cross_price: item.cross_price,
        description: item.description,
        color: item.description,
    });
    productSlug.value = item.slug;
}
// ====================================
</script>
<template>
    <!-- ==========Add Product=================== -->
    <div class="text-start pa-4">
        <v-btn @click="
            resetForm();
        dialog = true;
        btnName = 'Submit';
        " color="green" class="text-capitalize">
            Add Product
        </v-btn>

        <v-dialog v-model="dialog" width="auto" persistent scrollable>
            <v-card max-width="700" min-width="700" title="Add Product">
                <!-- form -->
                <v-form :valid="valid" @submit.prevent="submit" ref="productForm">
                    <v-container>
                        <v-row>
                            <!-- name -->
                            <v-col cols="12">
                                <v-text-field v-model="product.name" :rules="[rules.required]"
                                    label="Product Name"></v-text-field>
                            </v-col>
                            <!-- slug -->
                            <v-col cols="12">
                                <v-text-field v-model="product.slug" :rules="[rules.required]"
                                    label="Product Slug"></v-text-field>
                            </v-col>
                            <!-- Image -->
                            <v-col cols="12">
                                <v-file-input label="Product Image"
                                    accept="image/png, image/jpeg, image/svg,image/jpg , image/gif" prepend-icon=""
                                    prepend-inner-icon="mdi-camera" v-model="product.image" show-size counter
                                    chips></v-file-input>
                            </v-col>
                            <!-- price -->
                            <v-col cols="12">
                                <v-text-field v-model="product.price" :rules="[rules.price]"
                                    label="Product Price"></v-text-field>
                            </v-col>
                            <!-- cross price -->
                            <v-col cols="12">
                                <v-text-field v-model="product.cross_price" :rules="[rules.required]"
                                    label="Product Cross Price"></v-text-field>
                            </v-col>
                            <!-- Description -->
                            <v-col cols="12">
                                <v-textarea v-model="product.description" :rules="[rules.required]"
                                    label="Product Description"></v-textarea>
                            </v-col>
                            <!-- color -->
                            <v-col cols="12">
                                <v-text-field v-model="product.color" :rules="[rules.required]"
                                    label="Product Color"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancel" @click="
                            dialog = false;
                        productForm.reset();
                        " class="text-capitalize" variant="tonal">Cancel</v-btn>
                        <v-btn type="submit" :text="btnName" color="green" variant="flat" class="text-capitalize"
                            :disabled="disableSubmitBtn">Submit</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
    <!-- ========================================= -->

    <!-- =======display data with dataTable========== -->
    <v-data-table-server :items-per-page="filter.itemsPerPage" :loading="productStore.isLoading" :headers="headers"
        :items="products" :items-length="productStore.totalProducts" :sort-by="filter.sortBy" :items-per-page-options="[
            { title: '5', value: 5 },
            { title: '10', value: 10 },
            { title: 'All', value: productStore.totalProducts },
        ]" @update:options="loadItems" fixed-header height="500" :hover="true">
        <!-- display image -->
        <template v-slot:[`item.image_url`]="{ item }">
            <v-img :width="50" cover :src="item.image_url"></v-img>
        </template>
        <!-- display actions -->
        <template v-slot:[`item.action`]="{ item }">
            <div class="d-flex justify-space-evenly">
                <v-btn icon="mdi:mdi-pencil" variant="text" density="compact" color="warning" @click="
                    updateForm(item);
                dialog = true;
                btnName = 'Update';
                "></v-btn>
                <v-btn icon="mdi:mdi-trash-can-outline" variant="text" density="compact" color="red"
                    @click="deleteProducts(item.slug)"></v-btn>
                <router-link :to="{
                    name: 'admin-project-details',
                    params: { slug: item.slug },
                }">
                    <v-btn icon="mdi:mdi-eye" variant="text" density="compact" color="green"></v-btn>
                </router-link>
            </div>
        </template>
    </v-data-table-server>
    <!-- ============================================= -->
</template>