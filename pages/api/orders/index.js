import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

const handler = async (req, res) => {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        try {
            const orders = await Order.find().sort({ _id: -1 });
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    if (method === 'POST') {
        try {
            const order = await Order.create(req.body);
            // res.status(201).json({ message: 'sukses membuat order', order });
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: 'gagal membuat order', error });
        }
    }
};

export default handler;
