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
  const save = () => {
    defaultItem.value.id = uuidv4();
    itemsArray.value.push(defaultItem.value);
    localStore();

  };
  const localStore = () => {
    localStorage.setItem("items", JSON.stringify(itemsArray.value))
  }

  const deleteItemConfirm = () => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    itemsArray.value.splice(index, 1);
    localStore();
  }
  const editedItemSave = (() => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    Object.assign(itemsArray.value[index], defaultItem.value);
    localStore();
    console.log(itemsArray.value[index]);

  })

  const compositionSave = (() => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let index = itemsArray.value.indexOf(itemSearch);
    Object.assign(itemsArray.value[index], defaultItem.value);
    localStore();

  })


  const deleteCompositionConfirm = ((index) => {
    const itemSearch = itemsArray.value.find((i) => {
      return i.id === defaultItem.value.id;
    });
    let itemIndex = itemsArray.value.indexOf(itemSearch);
    console.log(itemSearch, itemIndex);

    itemsArray.value[itemIndex].composition.splice(index, 1);
    localStore();
  })

  return { itemsArray, save, defaultItem, deleteItemConfirm, deleteCompositionConfirm, editedItemSave, compositionSave };
});