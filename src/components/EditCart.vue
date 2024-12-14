<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { IconUpload, IconPhotoFilled } from "@tabler/icons-vue";
import Composition from "./Composition.vue";
import { components } from "vuetify/dist/vuetify-labs.js";
const store = useCartStore();
const { itemsArray } = storeToRefs(store);
const { editedItemSave } = store;
const alert = ref(false);
const props = defineProps({
  id: String,
});

const editedItem = ref({
  id: "",
  name: "",
  category: "",
  description: "",
  totalPrice: 0,
  designUrl: "",
  composition: [
    {
      material: "",
      count: 0,
      weight: 0,
      price: 0,
      purity: "",
    },
  ],
});

let retrievedItem;
onMounted(() => {
  let retrievedData = localStorage.getItem("items");
  if (retrievedData) itemsArray.value = JSON.parse(retrievedData);
  if (props.id) {
    retrievedItem = itemsArray.value.find((item) => {
      return props.id === item.id;
    });
    editedItem.value = { ...retrievedItem };
  }
});



const cancelEdit = () => {
  editedItem.value = { ...retrievedItem };
};
const uploadImage = () => {
  editedItemSave(editedItem.value);
  if(editedItem.value.designUrl!=='')                       
     alert.value = true;
};
const handleSave=(()=>{
  alert.value=true;
  editedItemSave(editedItem.value)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card class="h-100">
          <h1>Image</h1>
          <!-- <IconPhotoFilled/> -->
          <v-img
            v-if="editedItem.designUrl"
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="editedItem.designUrl"
          ></v-img>
          <v-img
            v-else
            :width="300"
            height="300"
            class="d-flex justify-center align-center bg-grey"
          >
            <IconPhotoFilled class="w-100 h-25" />
          </v-img>
          <v-text-field
            v-model="editedItem.designUrl"
            label="Enter your image url"
            class="ma-4 outlined"
          >
            <template #append>
              <IconUpload @click="uploadImage" />
            </template>
          </v-text-field>
        </v-card>
      </v-col>

      <v-col cols="8">
        <v-card class="h-100">
          <v-card-title>
            <span class="text-h5">New Item</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name of item"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    label="Select Category"
                    v-model="editedItem.category"
                    :items="[
                      'EarRing',
                      'Pendant',
                      'Ring',
                      'Chain',
                      'Necklace',
                      'Bangle',
                      'Bracelet',
                    ]"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-textarea
                      v-model="editedItem.description"
                      label="Description"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="Number"
                    v-model="editedItem.totalPrice"
                    label="TotalPrice"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-row class="d-flex justify-center mr-4">
                <v-btn variant="elevated" class="text-red" @click="cancelEdit">
                  Cancel
                </v-btn>

                <v-btn
                  class="text-blue"
                  variant="elevated"
                  @click="handleSave"
                >
                  Save
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-alert
      v-model="alert"
       border="start"
      color="success"
       close-label="Close Alert"
      variant="tonal"
       title="Alert"
       elevation="2"
      closable
      >
      Success</v-alert>
  <Composition :id="props.id" />
</template>