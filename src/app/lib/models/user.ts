import mongoose, { Schema} from 'mongoose';
import { User, Address, Supplier,Auth,Title ,Language, Img } from '@/app/types/user';
import { ConsumerPost, EventCategory, Post, Recommendation } from '@/app/types/post';

// הסכמה למודל משתמש
const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  titles: { 
    type: [String], // מערך של טיטלים
    enum: [...Object.values(Title), "consumer"], 
    required: true 
  },
  phone: { type: String },
  languages: { 
    type: [String], 
    enum: Object.values(Language),
    required: true 
  },
  addressId: { type: Schema.Types.ObjectId, ref: 'Address'},
  description: { type: String },
  postArr: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  likedPostsArr: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // הפניה לפוסטים שאהב
  likedPeople: [{ type: String }], // שמ  
  profileImage: { type: String, default: null },
});

// הסכמה למודל כתובת
const addressSchema = new Schema<Address>({
  userName: { type: String, ref: 'User', required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: Number, required: true },
});

const ImgSchema = new Schema<Img>({
  imgUrl: { type: String, ref: 'Img', required: true }
})

// הסכמה למודל הזדהות (Auth)
const authSchema = new Schema<Auth>({
  userName: { type: String, ref: 'User', required: true }, 
  email: { type: String, ref: 'User', required: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },
  otpExpiration: { type: Date, default: null },
});

// הסכמה למודל ספק
const supplierSchema = new Schema<Supplier>({
  userName: { type: String, ref: 'User', required: true },
  startingPrice: { type: Number, required: true },
  topPrice: { type: Number, required: true },
  range: { type: Number, required: true },
});

// הסכמה למודל צרכן



// הסכמה למודל פוסט
const postSchema = new Schema<Post>({
  userName: { type: String, ref: 'User', required: true },
  createDate: { type: Date, required: true },
  album: [{type: String, default: null}],
  title: { type: String, required: true },
  description: { type: String, required: true },
  recommendations: [{ type: Schema.Types.ObjectId, ref: 'Recommendation' }],
  postId: { type: Schema.Types.ObjectId, ref: 'ConsumerPost' }
});


// הסכמה למודל פוסט צרכן (ConsumerPost)
const consumerPostSchema = new Schema<ConsumerPost>({
  eventCategory: { 
    type: String, 
    enum: Object.values(EventCategory), 
    required: true 
  },
  supplierNameArr: [{ type: String, required: true }], // רשימת ספקים
  budget: { type: Number, required: true },
});

// הסכמה למודל המלצה
const recommendationSchema = new Schema<Recommendation>({
  userName: { type: String, required: true }, // הפניה למשתמש שנותן את ההמלצה
  text: { type: String, required: true },
  rate: { type: Number, required: true, min: 1, max: 5 }, // דירוג בין 1 ל-5
});

// מודל המידע

const AddressModel = mongoose.models.Address || mongoose.model<Address>('Address', addressSchema);
const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);
const SupplierModel = mongoose.models.Supplier || mongoose.model<Supplier>('Supplier', supplierSchema);
const PostModel = mongoose.models.Post || mongoose.model<Post>('Post', postSchema);
const ConsumerPostModel = mongoose.models.ConsumerPost || mongoose.model<ConsumerPost>('ConsumerPost', consumerPostSchema);
const RecommendationModel = mongoose.models.Recommendation || mongoose.model<Recommendation>('Recommendation', recommendationSchema);
const ImgModel = mongoose.models.Img || mongoose.model<Img>('Img', ImgSchema);
const AuthModel = mongoose.models.Auth || mongoose.model<Auth>('Auth', authSchema);


postSchema.virtual('userDetails', {
  ref: 'User', // שם המודל שאתה רוצה לשייך
  localField: 'userName', // השדה במודל Post שמשמש כמפתח
  foreignField: 'userName', // השדה במודל User שמקשר
  justOne: true, // אם אתה מצפה לתוצאה אחת
});
postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

// חיפוש חכם על כותרת, שם משתמש וקטגוריית האירוע
postSchema.index({ title: 'text' });
postSchema.index({ description: 'text' });
postSchema.index({ userName: 'text' });
postSchema.index({ 'consumerPost.eventCategory': 'text' });  // אם יש צורך לחפש גם בקטגוריית האירוע
userSchema.index({ 'addressId.city': 'text' });  // אינדקס על שדה העיר
userSchema.index({ title: 'text' });  // אינדקס על שדה הכותרת
userSchema.index({ language: 1 });  // אינדקס על שדה השפה
// סנכרון אינדקסים
// PostModel.syncIndexes();

export { 
  AddressModel, 
  UserModel, 
  SupplierModel, 
  PostModel,  
  ConsumerPostModel, 
  RecommendationModel, 
  AuthModel,
  ImgModel

};
