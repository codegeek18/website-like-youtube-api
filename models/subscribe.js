import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    ChannelSubscribed: { type: String, require: true },
    Subscriber: { type: String, require: true },
    SubscribedOn: { type: Date, default: Date.now }
})

export default mongoose.model('Subscription', subscriptionSchema);