package com.navigation;

import android.content.Context;
import android.widget.LinearLayout;

public class CustomView extends LinearLayout {
    private Context context;
    public CustomView(Context context) {
        super(context);//ADD THIS
        this.context = context;
        init();
    }

    public void init() {
        inflate(context, R.layout.activity_bd__thong_tin_treo_thao, this);
    }
}
