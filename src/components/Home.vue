

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { IconTrash,IconPencil } from "@tabler/icons-vue";
import { useRouter } from "vue-router";
const router=useRouter();
const store = useCartStore();
const {save,deleteItemConfirm}=store;
const {itemsArray,defaultItem}=storeToRefs(store)



const editedItem = ref({
  id: "",
  name: "",
  category: "",
  description: "",
  totalPrice: 0,
  designUrl: "",
        composition: [
          // {
          //   material: "",
          //   count: 0,
          //   weight: 0,
          //   price: 0,
          //   purity: "",
          // },
        ],
});
const headers = [
  { title: "Name", key: "name"},
  { title: "category", key: "category" },
  { title: "Description", key: "description"},
  { title: "TotalPrice", key: "totalPrice" },
   { title: 'Actions', key: 'actions'}
];

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);

onMounted(()=>{
  let retrievedData=localStorage.getItem("items");
  if(retrievedData)
     itemsArray.value=JSON.parse(retrievedData)
    defaultItem.value=editedItem.value
})


const editItem=(item)=>{
router.push(`/edit/${item.id}`)
}

//Close editing dialog box
const close = () => {
  dialog.value = false;
  editedIndex.value=-1;
  defaultItem.value=Object.assign({}, editedItem.value)
};

const closeDelete = () => {
  dialogDelete.value = false;
  editedIndex.value=-1;
  defaultItem.value=Object.assign({}, editedItem.value)
};

const showDeleteDialogBox=(item)=>{
  dialogDelete.value = true;
  defaultItem.value=item;
}
const deleteItem=(()=>{
  deleteItemConfirm();
  dialogDelete.value=false;
})
const saveItem=(()=>{

  save();
  defaultItem.value=Object.assign({}, editedItem.value)
  dialog.value=false;
  })

</script>
<template>
 
  <v-data-table :headers="headers" :items="itemsArray" class="headingClass">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Jewellery</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">

          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Item
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">New Item</span>
            </v-card-title>

            <v-card-text>
            
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="defaultItem.name"
                      label="Name of item"
                     
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    
                    <v-select
                      label="Select Category"
                      v-model="defaultItem.category"
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
                  <v-col cols="12">

                    <v-textarea
                      v-model="defaultItem.description"
                      label="Description"
                    ></v-textarea>

                  </v-col>
                  <v-col cols="12" >
                    <v-text-field
                    type="Number"
                      v-model="defaultItem.totalPrice"
                      label="TotalPrice"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
          
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveItem">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItem"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
   <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)" style="color:blue">
        <IconPencil/>
      </v-icon>
      <v-icon size="small" @click="showDeleteDialogBox(item)" style="color: red;"> <IconTrash/> </v-icon>
    </template>  
   
  </v-data-table>
</template>
    
