import { createSlice } from '@reduxjs/toolkit';
import { showToast } from './toastSlice';

const loadInitialWishlist = () => {
  try {
    const saved = localStorage.getItem('aura_wishlist_items');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  items: loadInitialWishlist()
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistItemAdded: (state, action) => {
      state.items.push(action.payload);
    },
    wishlistItemRemoved: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    wishlistCleared: (state) => {
      state.items = [];
    }
  }
});

export const {
  wishlistItemAdded,
  wishlistItemRemoved,
  wishlistCleared
} = wishlistSlice.actions;

export const toggleWishlist = (product) => (dispatch, getState) => {
  const items = getState().wishlist.items;
  const isSaved = items.some((item) => item.id === product.id);
  if (isSaved) {
    dispatch(wishlistItemRemoved(product.id));
    dispatch(showToast(`Removed ${product.name} from wishlist`, 'info'));
  } else {
    dispatch(wishlistItemAdded(product));
    dispatch(showToast(`Saved ${product.name} to wishlist!`, 'success'));
  }
};

export const selectWishlist = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item.id === productId);

export default wishlistSlice.reducer;
