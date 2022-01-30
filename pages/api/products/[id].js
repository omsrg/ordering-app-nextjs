import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    try {
        await dbConnect();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (method === 'GET') {
        try {
            const product = await Product.findById(id);
            res.status(200).json({ message: 'success', product });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'PUT') {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({
                message: 'data sent successfully',
                product,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'DELETE') {
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json('product has been deleted!');
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default handler;
