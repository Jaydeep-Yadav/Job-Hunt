import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
            unique: true,
            trim: true,
            minlength: [2, "Company name must be at least 2 characters"],
            maxlength: [100, "Company name must be less than 100 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description can't exceed 1000 characters"]
        },

        website: {
            type: String,
            trim: true,
            match: [
                /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                "Website must be a valid URL"
            ]
        },

        location: {
            type: String,
            trim: true,
            maxlength: [200, "Location must be less than 200 characters"]
        },

        logo: {
            type: String,
            trim: true,
            match: [
                /^$|^https?:\/\/[^\s/$.?#].[^\s]*$/,
                "Logo must be a valid URL"
            ],
            default: "https://res.cloudinary.com/dyqjyzxg0/image/upload/v1748237513/Job%20Hunt/Company%20Logo/nqvykyxmibctgpeetdxi.jpg"
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Company must be associated with a user"]
        }
    },
    { timestamps: true }
);

companySchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await mongoose.model('Job').deleteMany({ company: doc._id });
    console.log(`Jobs removed for deleted company: ${doc.name}`);
  }
});


const Company = mongoose.model("Company", companySchema);
export default Company;