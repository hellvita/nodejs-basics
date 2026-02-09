import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ** pre-hook Schema.pre("save") виконується перед збереженням користувача
userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email.split('@')[0];
  }
});

// ** видалення паролю з відповіді, перевизначивши метод toJSON()
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// ** на основі даних із першого аргументу в MongoDB автоматично створюється колекція
// ** (або використовується вже наявна при співпадінні імен)
// !! за принципом: User -> Users -> users
// ?? для використання специфічної назви колекції потрібно додати її третім аргументом:
// export const User = model('User', userSchema, 'members');
export const User = model('User', userSchema);
