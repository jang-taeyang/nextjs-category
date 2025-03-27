import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  category: Yup.string().oneOf(['Food', 'Sporting_Goods', 'Electronics', 'Other']).required(), // ✅ added
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  category: Yup.string().oneOf(['Food', 'Sporting_Goods', 'Electronics', 'Other']).required(), // ✅ added
  owner: Yup.string().required(),
});
