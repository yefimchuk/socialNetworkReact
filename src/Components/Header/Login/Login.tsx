import React from 'react';
import 'antd/dist/antd.css';
import {Button, Checkbox, Form, Input} from 'antd';
import s from "./login.module.css"
import {useFormik} from 'formik';
import {WithAuthRedirectToLogin} from "../../../hoc/WithAuthRedirectToLogin";


const Login = (props) => {

    return (
        <div className={s.Login}>

            <div className={s.Text}>Login in to Social Network</div>
            <LoginForm login={props.login} captchaURL={props.captchaURL}/>
        </div>
    );
};

export default Login


let LoginForm = (props) => {

    const formik = useFormik({

        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: "",
        },

        onSubmit: (values, action) => {

            props.login(values, action.setStatus)

        },
    });

    return <div className={s.LoginBlock}>


        <Form onFinish={formik.handleSubmit} labelCol={{
            span: 8,
        }} wrapperCol={{
            span: 20,
        }} initialValues={{
            remember: true,
        }} autoComplete="off">


            <Form.Item htmlFor="email" id="email"
                       label="Username"
                       name="email"
                       type="email"
                       onChange={formik.handleChange}
                       value={formik.values.username}
                       rules={[
                           {
                               required: true,
                               message: 'Please input your email!',
                           },
                       ]}>
                <Input className={s.input}/>
            </Form.Item>

            <Form.Item onChange={formik.handleChange}
                       value={formik.values.password}
                       label="Password"
                       name="password"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your password!',
                           },
                       ]}>
                <Input.Password className={s.input}/>
            </Form.Item>
            <Form.Item onChange={formik.handleChange}
                       name="rememberMe"
                       valuePropName="checked"
                       wrapperCol={{
                           offset: 8,
                           span: 16,
                       }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>

                <Button className={s.submit} type="primary" htmlType="submit">
                    Submit
                </Button>
                <div className={s.error}>
                    {formik.status && formik.status.error}
                    {props.captchaURL ? <img className={s.captcha} src={props.captchaURL}/> : null}
                    {props.captchaURL ?
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your captcha!',
                                },
                            ]}>
                            <Input onChange={formik.handleChange}
                                   value={formik.values.captcha}
                                   name="captcha"
                                   className={s.input}/>
                        </Form.Item> : null}
                </div>

            </Form.Item>


        </Form>

    </div>
}