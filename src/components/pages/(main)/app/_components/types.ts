export interface ButtonProps {
  title: string;
  id?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
}

export interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
}

export interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description: string;
  isComingSoon?: boolean
}