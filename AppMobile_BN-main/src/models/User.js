const mongoose = require("mongoose");

const enumMessenger = require("../utils/enum");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    address: {
      type: String,
    },
    school: {
      type: String,
    },
    work: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      default: "Male",
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      sparse: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      default: function () {
        if (this.gender === "Male") {
          return "https://cdn-icons-png.flaticon.com/256/0/93.png"; 
        } else if (this.gender === "Female") {
          return "https://cdn-icons-png.flaticon.com/256/53/53176.png"; 
        } else {
          return "https://cdn-icons-png.flaticon.com/256/266/266033.png"; 
        }
      },
    },
    wallpaper: {
      type: String,
      default:
        "https://e1.pxfuel.com/desktop-wallpaper/942/138/desktop-wallpaper-clear-blue-sky-panorama-%E2%9D%A4-for-ultra-sky.jpg",
    },
    stories: [{ type: mongoose.Types.ObjectId, ref: "Story" }],
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    requestFriendSent: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    requestFriendReceived: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    // offline -> 0
    // online -> 1
    // notWorking -> 2
    userStatus: {
      type: Number,
      default: enumMessenger.userStatus.offline,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.index({ fullName: "text" });
UserSchema.index({ fullName: 1 });

module.exports = mongoose.model("User", UserSchema);
