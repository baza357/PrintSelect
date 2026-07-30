"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface ProfileDrawerProps {
  setDrawer: (value: null) => void;
}

export function ProfileDrawer({
  setDrawer,
}: ProfileDrawerProps) {

  const [mode, setMode] = useState<"login" | "register">("login");

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    async function checkUser() {

      const {
        data
      } = await supabase.auth.getUser();

      setUser(data.user);

    }

    checkUser();


    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUser(session?.user ?? null);

      }
    );


    return () => {

      listener.subscription.unsubscribe();

    };

  }, []);



  async function register() {

    setLoading(true);
    setMessage("");

    const {
      error
    } = await supabase.auth.signUp({

      email,
      password,

      options: {

        data: {
          name,
          phone,
        },

      },

    });


    setLoading(false);


    if (error) {

      setMessage(error.message);
      return;

    }


    setMessage(
      "Письмо подтверждения отправлено на почту"
    );

  }



  async function login() {

    setLoading(true);
    setMessage("");


    const {
      error
    } = await supabase.auth.signInWithPassword({

      email,
      password,

    });


    setLoading(false);


    if (error) {

      setMessage(error.message);
      return;

    }


    setMessage("Вы успешно вошли");

  }



  async function logout() {

    await supabase.auth.signOut();

    setUser(null);

  }



  return (

    <>

      <div
        className="overlay"
        onClick={() => setDrawer(null)}
      />


      <aside className="drawer">


        <button
          className="close"
          onClick={() => setDrawer(null)}
        >
          <X />
        </button>



        <p>
          Ваше пространство
        </p>



        <h2>
          Личный кабинет
        </h2>



        {user ? (

          <>

            <h3>
              Вы вошли
            </h3>


            <span>
              {user.email}
            </span>


            <button
              className="primary wide"
              onClick={logout}
            >
              Выйти из аккаунта
            </button>


          </>


        ) : (

          <>


            <h3>
              {mode === "login"
                ? "Вход в аккаунт"
                : "Создайте аккаунт"
              }
            </h3>



            <span>
              Сохраняйте проекты, следите за заказами
              и создавайте новые дизайны.
            </span>



            <form
              onSubmit={(e)=>{

                e.preventDefault();

                mode === "login"
                  ? login()
                  : register();

              }}
            >


              {mode === "register" && (

                <>

                  <label>
                    Имя

                    <input
                      value={name}
                      onChange={(e)=>
                        setName(e.target.value)
                      }
                      placeholder="Как к вам обращаться"
                    />

                  </label>



                  <label>
                    Телефон

                    <input
                      value={phone}
                      onChange={(e)=>
                        setPhone(e.target.value)
                      }
                      placeholder="+7 (___) ___-__-__"
                    />

                  </label>

                </>

              )}



              <label>
                Email

                <input
                  value={email}
                  onChange={(e)=>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="name@example.ru"
                />

              </label>



              <label>
                Пароль

                <input
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  type="password"
                  placeholder="Минимум 8 символов"
                />

              </label>



              <button
                className="primary wide"
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Подождите..."
                  : mode === "login"
                    ? "Войти"
                    : "Создать аккаунт"
                }

              </button>


            </form>



            <button
              className="textButton"
              onClick={()=>
                setMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
            >

              {mode === "login"
                ? "Нет аккаунта? Регистрация"
                : "Уже есть аккаунт? Войти"
              }

            </button>



            {message && (

              <p>
                {message}
              </p>

            )}


          </>

        )}


      </aside>

    </>

  );

}