package com.navigation;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.bridge.Callback;

import java.util.Map;

public class MyCustomReactViewManager extends SimpleViewManager<CustomView> {

    public static final String REACT_CLASS = "MyCustomReactViewManager";
    private String message = "NOT SET";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactProp(name = "message")
    public void setMessage(CustomView view, @Nullable String message) {
        Log.i("Set Message", "ANDROID_SAMPLE_UI");
        view.setMessage(message);
    }

    @Override
    public CustomView createViewInstance(ThemedReactContext context) {
        Log.i("Create View Instance", "ANDROID_SAMPLE_UI");
        return new CustomView(context); //If your customview has more constructor parameters pass it from here.
    }


}
