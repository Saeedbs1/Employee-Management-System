export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^\d{8}$/;
  return regex.test(phone);
};

export const validateSalary = (salary: number): boolean => {
  return salary >= 500;
};

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

export const validateAge = (age: number): boolean => {
  return age > 18;
};
