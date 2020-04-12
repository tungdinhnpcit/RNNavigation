import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Alert,
    Modal,
} from "react-native";
import ControlText from "../../component/ControlText";
import { CustomHeader } from "../../index";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import AppStyle from "../../style";
import { IMAGE } from "../../constant/Image";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ProducDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            product: {},
            cart: [],
            cartCount: [],
            apiUrl: "",
            GroupId: 0,
            config: {},
            token: ''
        };
    }

    async componentDidMount() {
        this.props.navigation.addListener("focus", async () => {
            await AsyncStorage.getItem('token').then((value) => {
                this.setState({ token: JSON.parse(value).data });
            });
            await AsyncStorage.getItem('apiUrl').then((value) => {
                this.setState({
                    config: JSON.parse(value)
                });
            });
            const { GroupId } = this.props.route.params;
            this.setState({ GroupId: GroupId })
            this.loadData();

        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f9ff" }}>
                <CustomHeader
                    title="Món ăn"
                    isHome={true}
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            this.renderItem(item, index)
                        }
                        keyExtractor={(item, index) => "keyP" + index}
                    />
                </ScrollView>
                <View style={AppStyle.viewDelivery}>
                    <View style={{ width: "60%" }, AppStyle.viewButtonCart}>
                        <View style={{ width: 50, height: 50 }}>
                            <Image source={IMAGE.ICON_CARTDELIVERY}
                                style={{ width: 40, height: 40 }} resizeMode="contain"></Image>
                            <View style={{ position: "absolute", right: 0, top: 0, backgroundColor: "red", width: 20, height: 20, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
                                <ControlText style={{ fontSize: 15 }}>{this.state.product ? this.state.product.COUNT : 0}</ControlText>
                            </View>
                        </View>
                        <ControlText style={AppStyle.textViewButtonCart}>{this.state.cartCount.TOTAL}đ</ControlText>
                    </View>
                    <View style={{ width: windowWidth * 0.4 }, AppStyle.viewButtonDelivery}>
                        <TouchableOpacity style={[{ width: windowWidth * 0.3, height: windowHeight * 0.05 }, AppStyle.buttonDelivery]}>
                            <ControlText style={AppStyle.textDelivery}>Giao hàng</ControlText>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    renderItem = (item, index) => {
        return (
            <View
                key={"P_" + item.Id}
                style={[{ width: windowWidth }, AppStyle.productView]}>
                <Image
                    source={{ uri: `${this.state.config.urlImage}${item.HINH_ANH}` }}
                    style={{ width: windowWidth * 0.4, height: windowHeight * 0.2 }}
                    resizeMode={"stretch"}
                />
                <View style={[{ width: windowWidth * 0.6 }, AppStyle.product]}>
                    <ControlText
                        style={AppStyle.productTitle}
                    >
                        {item.TEN}
                    </ControlText>
                    <ControlText
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            fontSize: 14,
                        }}
                    >
                        {item.DON_GIA} đ
                    </ControlText>
                    <View style={[{ justifyContent: 'center', alignItems: "center" }, AppStyle.productAdd]}>
                        <TouchableOpacity onPress={() => { this.addItem(item) }}>
                            <Image source={IMAGE.ICON_ADD} style={AppStyle.productIconAdd}></Image>
                        </TouchableOpacity>
                        <ControlText style={[{ width: windowWidth * 0.15 }, AppStyle.productNumber]}>{item.count || 0}</ControlText>
                        <TouchableOpacity onPress={() => { this.removeItem(item) }}>
                            <Image source={IMAGE.ICON_SUB} style={AppStyle.productIconAdd}></Image>
                        </TouchableOpacity>

                    </View>
                    <View style={[{ width: windowWidth * 0.6, justifyContent: 'center', alignItems: "center", marginTop: 10 }, AppStyle.product]}>
                        <TouchableOpacity style={[{ width: windowWidth * 0.3, height: windowHeight * 0.05 }, AppStyle.buttonDelivery]} onPress={() => { this.addCart(item) }}>
                            <ControlText style={AppStyle.textDelivery}>Add To Cart</ControlText>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    loadData() {
        try {

            axios({
                method: 'POST',
                url: `${this.state.config.apiUrl}GetSanPhamTheoheLoai`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.state.token}`
                },
                data: {
                    ID: this.state.GroupId
                }
            }).then((response) => {
                this.setState({
                    data: response.data
                });

            }).catch(function (error) {
                console.log("!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n")
                console.log(error);
            });
        } catch (error) {
            Alert.alert("Load loadData loi:", JSON.stringify(error));
        }
    }

    addItem = (item) => {
        try {
            let product = this.state.product || {};
            product = item;
            product.COUNT = product.COUNT++ || 1;
            this.setState({ product: product });

            let cartCount = this.state.cartCount || [];
            let cart = this.state.cart || [];
            var index = cart.indexOf(item);
            if (cartCount.COUNT != null) {


                cartCount.COUNT++;
                cartCount.TOTAL += item.DON_GIA;
                this.setState({ cartCount: cartCount });
                if (index !== -1) {
                    cart[index].count++;
                    this.setState({ cart: cart });
                }
                else {
                    //add cart to empty cart
                    item.count = 1;
                    cart.push(item);
                    this.setState({ cart: cart });
                }
            }
            else {
                cartCount.COUNT = 1;
                cartCount.TOTAL = item.DON_GIA;
                this.setState({ cartCount: cartCount });

                if (index !== -1) {
                    cart[index].count++;
                    this.setState({ cart: cart });
                }
                else {
                    //add cart to empty cart
                    item.count = 1;
                    cart.push(item);
                    this.setState({ cart: cart });
                }
            }
        }
        catch (error) {
            console.log('!!!addItem error!!!', error);
        }
    }

    removeItem = (item) => {
        try {
            let cartCount = this.state.cartCount || [];
            if (cartCount.COUNT > 0) {
                let product = this.state.product || {};
                product = item;
                product.COUNT = product.COUNT-- || 1;

                let cart = this.state.cart || [];
                var index = cart.indexOf(item);

                if (cartCount.COUNT != null) {
                    cartCount.COUNT--;
                    cartCount.TOTAL -= item.DON_GIA;
                    this.setState({ cartCount: cartCount });


                    if (index !== -1) {
                        if (cart[index].count > 0) {
                            cart[index].count--;
                            cart.splice(index, 1);
                            this.setState({ cart: cart });
                        }
                    }
                }
            }

        }
        catch (error) {
            console.log('!!!removeItem error!!!', error);
        }
    }

    addCart = (item) => {
        try {

            const data = this.state.data || [];
            // for (let i = 0; i < data.length; i++) {
            //     if (item.Id === data[i].Id) {
            //         data[i].count = (data[i].count || 0) + 1;
            //         this.setState({ data: data });
            //         return;
            //     }
            // }
        }
        catch (error) {
            console.log('!!!addItem error!!!', error);
        }
    }
}