

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import { IconTrash, IconPencil } from "@tabler/icons-vue";

const router = useRouter(); // Initialize router
const store = useCartStore();
const { itemsArray } = storeToRefs(store);
const editedItem = ref({
  id: "",
  name: "",
  category: "",
  description: "",
  totalPrice: 0,
});

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const originalItem =ref({})

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

const defaultItem = ref({
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

const headers = [
  { title: "Name", key: "name" },
  { title: "category", key: "category" },
  { title: "Description", key: "description" },
  { title: "TotalPrice", key: "totalPrice" },
  { title: "Actions", key: "actions" },
];

onMounted(() => {
  store.initializeStore();
});

const editItem = (item) => {
  // Store the original item before editing (ensure no changes are made initially)
  originalItem.value = { ...item };
  editedItem.value = { ...item }; // Make a copy of the item to edit
  router.push({ name: "EditCart", params: { id: item.id } });
};
const deleteItem = (item) => {
  editedIndex.value = itemsArray.value.findIndex((i) => i.id === item.id);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  store.deleteItem(editedIndex.value);
  closeDelete();
};

const close = () => {
  // When cancel is clicked, reset the editedItem to its original value
  editedItem.value = { ...originalItem.value };
  dialog.value = false;
  editedIndex.value = -1;
};


const closeDelete = () => {
  dialogDelete.value = false;
  editedIndex.value = -1;
  editedItem.value = { ...defaultItem.value };
};

const save = () => {
  if (editedIndex.value > -1) {
    // Only update the item if save is clicked
    store.editItem(editedIndex.value, editedItem.value);
  } else {
    editedItem.value.id = uuidv4(); // Generate new ID for new item
    store.addItems(editedItem.value);
  }
  close(); // Close dialog after saving
};
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
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name of item"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        
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
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.description"
                          label="Description"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
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
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="save">
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
                    @click="deleteItemConfirm"
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
          <v-icon size="small" @click="deleteItem(item)" style="color: red;"> <IconTrash/> </v-icon>
        </template>  
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>  -->
      </v-data-table>
    </template>
    
