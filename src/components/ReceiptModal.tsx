import React, { useEffect } from 'react';
import './ReceiptModal.css';
import { motion, Variants } from 'framer-motion';

export interface ReceiptModalProps {
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  orderId?: number | null;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const printerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, delay: 0.3 } }
};

const receiptVariants: Variants = {
  hidden: { y: -200, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } }
};

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ReceiptModal({ items, subtotal, shipping, total, orderId, onClose }: ReceiptModalProps) {
  const allLines = [
    'Payment Successful',
    orderId ? `Order #${orderId}` : '',
    '',
    ...items.map(i => `${i.product.name} x${i.quantity} $${(i.product.price * i.quantity).toFixed(2)}`),
    '',
    `Subtotal: $${subtotal.toFixed(2)}`,
    `Shipping: $${shipping.toFixed(2)}`,
    `Total: $${total.toFixed(2)}`,
    '',
    'Thank you for your order!',
    'Have a nice day!'
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(onClose, allLines.length * 400 + 2000);
    return () => { clearTimeout(timer); document.body.style.overflow = ''; };
  }, [allLines.length, onClose]);

  return (
    <motion.div className="receipt-modal-overlay" variants={overlayVariants} initial="hidden" animate="visible">
      <motion.div className="receipt-container" variants={printerVariants} initial="hidden" animate="visible">
        <motion.div className="printer-top" variants={printerVariants} initial="hidden" animate="visible">
          <motion.span className="paid-badge" initial={{ scale:0 }} animate={{ scale:1, transition:{ delay:1.2, type:'spring', stiffness:120 } }}>PAID</motion.span>
        </motion.div>
        <motion.div className="receipt-roll" variants={receiptVariants} initial="hidden" animate="visible">
          <motion.div variants={listVariants} initial="hidden" animate="visible">
            {allLines.map((line, i) => (
              <motion.div key={i} className="receipt-line" variants={itemVariants}>
                {line}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <button className="receipt-close" onClick={onClose} />
      </motion.div>
    </motion.div>
  );
}
