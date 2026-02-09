import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

studentSchema.index(
  { name: 'text' },
  { name: 'StudentTextIndex', default_language: 'english' },
);

// ** на основі даних із першого аргументу в MongoDB автоматично створюється колекція
// ** (або використовується вже наявна при співпадінні імен)
// !! за принципом: Student -> Students -> students
// ?? для використання специфічної назви колекції потрібно додати її третім аргументом:
// export const User = model('Student', studentSchema, 'pupils');
export const Student = model('Student', studentSchema);
