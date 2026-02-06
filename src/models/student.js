import { Schema } from 'mongoose';

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
