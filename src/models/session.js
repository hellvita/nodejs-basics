import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ** на основі даних із першого аргументу в MongoDB автоматично створюється колекція
// ** (або використовується вже наявна при співпадінні імен)
// !! за принципом: Session -> Sessions -> sessions
// ?? для використання специфічної назви колекції потрібно додати її третім аргументом:
// export const Session = model('Session', sessionSchema, 'auths');
export const Session = model('Session', sessionSchema);
