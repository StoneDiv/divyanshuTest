import { Request, Response } from 'express';
import User from '../models/User';

export const addToMyList = async (req: Request, res: Response) => {
  try {
    const { userId, contentId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.watchHistory.some(item => item.contentId.toString() === contentId)) {
      return res.status(400).json({ message: 'Item already in the list' });
    }
    user.watchHistory.push({ contentId });
    await user.save();
    res.status(200).json(user.watchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const removeFromMyList = async (req: Request, res: Response) => {
  try {
    const { userId, contentId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.watchHistory = user.watchHistory.filter(item => item.contentId.toString() !== contentId);
    await user.save();
    res.status(200).json(user.watchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const listMyItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.watchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
