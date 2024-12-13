<script setup>

import { onMounted, ref } from 'vue';
import Composition from './Composition.vue';
import { useRoute,useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { IconUpload,IconPhotoDown } from '@tabler/icons-vue';

const router = useRouter();
const route = useRoute();
const store = useCartStore();
const {editItem, uploadImage} =store
const originalItem = ref({});
const editedItem = ref({
  id: '',
  name: '',
  category: '',
  description: '',
  totalPrice: 0,
  imageUrl:'',

  Compositions:[
    {
      material:"",
      count:0,
      weight:0,
      price:0,
      purity:" "
    }
  ]
});
onMounted(() => {
  const id = route.params.id;
  const item = store.itemsArray.find((item) => item.id === id) || {};
  editedItem.value = { ...item };
  originalItem.value = { ...item }; 
});

const save =()=>{
    store.editItem(route.params.id,editedItem.value)
    router.push('/')
}


const cancel = () => {
  editedItem.value = { ...originalItem.value }; 
 
};

const updateImage = () => {
   uploadImage(editedItem.value.id, editedItem.value.designUrl);
};

</script>

<template>
  <div>
    <h1>Edit Cart Item</h1>
    <v-container>
      <v-row>
        <!-- Image section on the left -->
        <v-col cols="12" md="4">
          <!-- Card for displaying image and input URL -->
          <v-card class="d-flex flex-column align-center justify-center" height="300px">
            <h1>Image</h1>

            <!-- Displaying the image or default icon -->
            <v-img
              v-if="editedItem.designUrl"
              :src="editedItem.designUrl"
              :width="300"
              aspect-ratio="16/9"
              cover
            ></v-img>

            <div
              v-else
              class="d-flex align-center justify-center"
              style="height: 300px; width: 300px;"
            >
              <v-icon size="150" color="grey">
                <IconPhotoDown />
              </v-icon>
            </div>

            <!-- Input field for image URL with upload icon -->
            <v-text-field
              v-model="editedItem.designUrl"
              label="Enter your image URL"
              class="ma-4 outlined "
              style="width: 200px;"
            >
              <template #append>
                <IconUpload @click="updateImage" />
              </template>
            </v-text-field>
          </v-card>
        </v-col>

        <!-- Form section on the right -->
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.name"
            label="Name of item"
          ></v-text-field>
          <v-select
            label="Category"
            v-model="editedItem.category"
            :items="[ 'EarRing', 'Pendant', 'Ring', 'Chain', 'Necklace', 'Bangle', 'Bracelet' ]"
          ></v-select>
          <v-text-field
            v-model="editedItem.description"
            label="Description"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="editedItem.totalPrice"
            label="Total Price"
          ></v-text-field>
          <v-btn color="primary" @click="save">Save</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Composition :item="editedItem" />
  </div>
</template>
