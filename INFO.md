pwd: 498061
root .p********



/**
     * 这里为了和iOS保持同步采用的是获取图片中和色,取红，绿，蓝的平均值，未考虑色值溢出的问题
     * 个人建议还是采用Google的Palette算法
     *
     * @param bitmap
     * @return 处理后的颜色值
     */
    public static int processBitmap(Bitmap bitmap) {
        if (bitmap != null) {
            int width = bitmap.getWidth();
            int height = bitmap.getHeight();
            long red = 0;
            long green = 0;
            long blue = 0;
            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    try {
                        int color = bitmap.getPixel(x, y);
                        red += color >> 16 & 0xff;
                        green += color >> 8 & 0xff;
                        blue += color & 0xff;
                    } catch (IllegalArgumentException exception) {
                        return -1;
                    }
                }
            }
            int count = width * height;
            red = red / count;
            green = green / count;
            blue = blue / count;
            float[] hsl = new float[3];
            Color.RGBToHSV((int) red, (int) green, (int) blue, hsl);
            return processHsl(hsl);
        }
        return -1;
    }

    /**
     * 1.【B明度】0-40：*1.5倍／40-80:*不变／80-100：*0.85倍
     * 2.【S饱和度】0-15：*3倍/15-50：*1.5倍/50-80：*1不变／80-100：*0.85倍
     *
     * @param hsl
     * @return 颜色值
     */
    public static int processHsl(float[] hsl) {
        float hue = hsl[0];
        float saturation = hsl[1];
        float lightness = hsl[2];
        if (lightness < 0.4f) {
            lightness = (float) (lightness * 1.5);
        } else if (lightness > 0.8f) {
            lightness = (float) (lightness * 0.85);
        }
        if (saturation < 0.15f) {
            saturation = saturation * 3;
        } else if (saturation < 0.5f) {
            saturation = (float) (saturation * 1.5);
        } else if (saturation > 0.8f) {
            saturation = (float) (saturation * 0.85);
        }
        float[] newHsl = {hue, saturation, lightness};
        return Color.HSVToColor(newHsl);
    }
