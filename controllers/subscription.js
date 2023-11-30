import subscribe from '../models/subscribe.js';

export const subscriptionController = async (req, res) => {
    const subscribeData = req.body;
    const addToSubscription = new subscribe(subscribeData);
console.log(subscribeData)
    try {
        await addToSubscription.save();
        res.status(200).json('Added to Subscriptions');
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getAllSubscriptions = async (req, res) => {
    try {
        const files = await subscribe.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }  
};

export const deleteSubscriptionController = async (req, res) => {
    const { ChannelSubscribed: ChannelSubscribed, Subscriber: Subscriber } = req.params;
    try {
        await subscribe.findOneAndDelete({
            ChannelSubscribed: ChannelSubscribed, Subscriber: Subscriber
        });
        res.status(200).json({ message: "Removed from your Subscriptions" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};