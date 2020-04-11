package com.navigation;

import android.content.Context;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class CustomView extends LinearLayout {
    private Context context;
    public String message = "This is example";

    public CustomView(Context context) {
        super(context);//ADD THIS
        this.context = context;
        init();
    }

    public void init() {
        inflate(context, R.layout.activity_bd__thong_tin_treo_thao, this);
    }

    public void setMessage(String message) {
//        Toast.makeText(getContext(), message, Toast.LENGTH_LONG).show();
    }

    public String getMessage() {
        return this.message;
    }

}
