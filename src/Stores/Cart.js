import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from "uuid";
export const useCartStore = defineStore("cart", () => {
  const itemsArray = ref([]);
  const defaultItem = ref({
    id: "",
    name: "",
    category: "",
    description: "",
    totalPrice: 0,
    designUrl: "",
    composition: [

    ],
  });
  //actions
  const save = (editedItem) => {
    editedItem.id = uuidv4();
    itemsArray.value.push(editedItem);
    localStore();

  };
  const localStore = () => {
    localStorage.setItem("items", JSON.stringify(itemsArray.value))
  }

  const deleteItemConfirm = (item) => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === item.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    itemsArray.value.splice(index, 1);
    localStore();
  }
  const editedItemSave = ((item) => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === item.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    Object.assign(itemsArray.value[index], item);
    localStore();
    console.log(itemsArray.value[index]);

  })

  const compositionSave = ((item) => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === item.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    Object.assign(itemsArray.value[index], item);
    localStore();

  })


  const deleteCompositionConfirm = ((index, item) => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === item.id;
    });
    let itemIndex = itemsArray.value.indexOf(itemSearch);
    console.log(itemSearch, itemIndex);

    itemsArray.value[itemIndex].composition.splice(index, 1);
    localStore();
  })

  return { itemsArray, save, defaultItem, deleteItemConfirm, deleteCompositionConfirm, editedItemSave, compositionSave };
});