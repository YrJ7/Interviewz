import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  clerkId?: string
  name?: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, index: true },
    name: String,
    email: { type: String, index: true },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
