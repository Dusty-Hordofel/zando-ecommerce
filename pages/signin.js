import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import LoginInput from "../components/inputs/loginInput";
import CircledIconBtn from "../components/buttons/circledIconBtn";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";

const signin = () => {
  return (
    <>
      <Header country="France" />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="France" />
    </>
  );
};

export default signin;
