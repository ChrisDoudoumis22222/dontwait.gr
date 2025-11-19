"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Shared motion wrappers with proper React.ComponentProps typing.
 * Use these instead of motion.div, motion.p, etc. in TSX files.
 */

export type MotionDivProps = React.ComponentProps<typeof motion.div>;
export const MotionDiv: React.FC<MotionDivProps> = (props) => (
  <motion.div {...props} />
);

export type MotionPProps = React.ComponentProps<typeof motion.p>;
export const MotionP: React.FC<MotionPProps> = (props) => (
  <motion.p {...props} />
);

export type MotionSectionProps = React.ComponentProps<typeof motion.section>;
export const MotionSection: React.FC<MotionSectionProps> = (props) => (
  <motion.section {...props} />
);

export type MotionButtonProps = React.ComponentProps<typeof motion.button>;
export const MotionButton: React.FC<MotionButtonProps> = (props) => (
  <motion.button {...props} />
);
