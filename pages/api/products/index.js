import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';

const handler = async (req, res) => {
    const { method } = req;

    // const token = cookies.token;

    await dbConnect();

    if (method === 'GET') {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'POST') {
        // if (!token || token !== process.env.TOKEN) {
        //     return res.status(401).json('Not Authenticated!');
        // }

        try {
            await Product.create(req.body);
            res.status(201).json({ message: 'data sent successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default handler;
