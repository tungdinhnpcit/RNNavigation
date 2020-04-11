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
import ControlText from "../component/ControlText";
import { CustomHeader } from "../index";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import AppStyle from "../style";
import { IMAGE } from "../constant/Image";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ProducDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cartData: [],
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
                        <Image source={IMAGE.ICON_CARTDELIVERY}
                            style={{ width: windowWidth * 0.1, height: windowHeight * 0.1 }} resizeMode="contain"></Image>
                        <ControlText style={AppStyle.textViewButtonCart}>60.000đ</ControlText>
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

            const data = this.state.data || [];
            for (let i = 0; i < data.length; i++) {
                if (item.Id === data[i].Id) {
                    data[i].count = (data[i].count || 0) + 1;
                    this.setState({ data: data });
                    return;
                }
            }
        }
        catch (error) {
            console.log('!!!addItem error!!!', error);
        }
    }

    removeItem = (item) => {
        try {

            const data = this.state.data || [];
            for (let i = 0; i < data.length; i++) {
                if (item.Id === data[i].Id) {
                    if (data[i].count > 0) {
                        data[i].count = (data[i].count || 0) - 1;
                        this.setState({ data: data });
                    }
                    return;
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