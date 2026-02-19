// Variant styles
export const variantStyles = {
  default: {
    active:
      "bg-primary text-[#219653] border border-[#219653]/20 hover:bg-[#219653]/[0.12] hover:border-[#219653]/30",
    inactive:
      "bg-red text-[#D34053] border border-[#D34053]/20 hover:bg-[#D34053]/[0.12] hover:border-[#D34053]/30",
  },
  glow: {
    active:
      "bg-primary text-white shadow-[#219653]/30 hover:shadow-xl hover:shadow-[#219653]/40 border border-[#219653]/50",
    inactive:
      "bg-red text-white shadow-[#D34053]/30 hover:shadow-xl hover:shadow-[#D34053]/40 border border-[#D34053]/50",
  },
  gradient: {
    active:
      "bg-gradient-to-r from-[#219653] to-[#2ECC71] text-white hover:from-[#1e8449] hover:to-[#28b463] border border-white/20",
    inactive:
      "bg-gradient-to-r from-[#D34053] to-[#E74C3C] text-white hover:from-[#b73544] hover:to-[#cb4335] border border-white/20",
  },
  glass: {
    active:
      "bg-primary text-[#219653] backdrop-blur-md border border-[#219653]/30 hover:bg-[#219653]/25 shadow-sm",
    inactive:
      "bg-red text-[#D34053] backdrop-blur-md border border-[#D34053]/30 hover:bg-[#D34053]/25 shadow-sm",
  },
  minimal: {
    active:
      "bg-transparent text-[#219653] border-2 border-[#219653]/40 hover:border-[#219653] hover:bg-[#219653]/5",
    inactive:
      "bg-transparent text-[#D34053] border-2 border-[#D34053]/40 hover:border-[#D34053] hover:bg-[#D34053]/5",
  },
  neon: {
    active:
      "bg-black text-[#00FF88] border border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)]",
    inactive:
      "bg-black text-[#FF4757] border border-[#FF4757] shadow-[0_0_15px_rgba(255,71,87,0.3)] hover:shadow-[0_0_25px_rgba(255,71,87,0.5)]",
  },
  pulse: {
    active:
      "bg-[#219653]/[0.08] text-[#219653] border border-[#219653]/20 hover:bg-[#219653]/[0.12] animate-pulse-subtle",
    inactive:
      "bg-[#D34053]/[0.08] text-[#D34053] border border-[#D34053]/20 hover:bg-[#D34053]/[0.12] animate-pulse-subtle",
  },
};
