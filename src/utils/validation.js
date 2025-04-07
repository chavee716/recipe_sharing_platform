export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const validateRecipeForm = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Description is required';
  }

  if (!formData.ingredients?.length) {
    errors.ingredients = 'At least one ingredient is required';
  }

  if (!formData.instructions?.trim()) {
    errors.instructions = 'Instructions are required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 