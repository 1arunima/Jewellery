<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const { initializeStore, addComposition } = cartStore;

const dialog = ref(false);
const editedItem = ref({
  id: '', // Set this ID when selecting or creating the item
  name: '',
  category: '',
  description: '',
  totalPrice: 0,
  imageUrl: '',
  Compositions: [],
});

const newComposition = ref({
  material: '',
  count: 0,
  weight: 0,
  price: 0,
  purity: '',
});

const Headers = [
  { title: 'Material', key: 'material' },
  { title: 'Count', key: 'count' },
  { title: 'Weight (g)', key: 'weight' },
  { title: 'Price ($)', key: 'price' },
  { title: 'Purity (%)', key: 'purity' },
  { title: 'Actions', key: 'actions', sortable: false },
];

// Handler for adding the composition
const addCompositionHandler = () => {
  if (
    newComposition.value.material &&
    newComposition.value.count > 0 &&
    newComposition.value.weight > 0 &&
    newComposition.value.price > 0 &&
    newComposition.value.purity
  ) {
    // Add the composition to the store
    addComposition(editedItem.value.id, newComposition.value);

    // Reset composition fields and close the dialog
    resetNewComposition();
    dialog.value = false;
  } else {
    alert('Please fill in all fields correctly.');
  }
};

// Reset form fields for new composition
const resetNewComposition = () => {
  newComposition.value = {
    material: '',
    count: 0,
    weight: 0,
    price: 0,
    purity: '',
  };
};

// Delete composition method
const deleteComposition = (index) => {
  editedItem.value.Compositions.splice(index, 1);
  // Update localStorage after deletion
  addComposition(editedItem.value.id, editedItem.value.Compositions);
};
</script>

<template>
  <v-data-table
    :headers="Headers"
    :items="editedItem.Compositions"
    :sort-by="[{ key: 'material', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Compositions</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              Add Composition
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add New Composition</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newComposition.material"
                      label="Material"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newComposition.count"
                      label="Count"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newComposition.weight"
                      label="Weight (g)"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newComposition.price"
                      label="Price ($)"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newComposition.purity"
                      label="Purity (%)"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="addCompositionHandler">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initializeStore">Reset</v-btn>
    </template>
  </v-data-table>
</template>