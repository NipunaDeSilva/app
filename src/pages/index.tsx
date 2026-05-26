"use client";

import { useRouter } from "next/router";
import UserCard from "@/components/UserCard";
import React, { useEffect, useState } from "react";
import { fetchUsers } from "./api/userApi";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Greeting from "@/components/Greeting";
import Counter from "@/components/Counter";

type Item = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
}

type User = {
  id: number,
  name: string,
}

export default function Home() {
  //const name = "Nipuna";
  const course = "FSD";

  const router = useRouter();
  
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if(email === "admin@mail.com"){
      router.push("/contact");
    }
    else{
      alert("invalid");
    }
  }
  const {
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
  } = useAppContext();

  const [name, setName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [items, setItems] = useState<Item[]>([
    {id: 1, name: "Hotel"},
    {id: 2, name: "Rental Car"},
  ]);

  const [showItems, setShowItems] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState("");

  //const [users, setUsers] = useState<User[]>([]);

  //const [loading, setLoading] = useState(false);

  //const [error, setError] = useState("");
  
  useEffect(() => {
    const loadUsers = async() => {
      try{
        setLoading(true);

        const data = await fetchUsers();

        setUsers(data);
      } catch (err) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [setUsers, setLoading, setError]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if(storedProducts){

      console.log(JSON.parse(storedProducts));

      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    let newErrors = {
      name: "",
      email: "",
    };

    if(!formData.name.trim()){
      newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@") || !formData.email.includes(".com")) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);

    if(
      newErrors.name || newErrors.email
    ){
      return;
    }

    alert("Submitted successfully.")
  }

  const handleAddProduct = () => {
    if(!productName.trim()) return;

    const newProduct: Product = {
      id: Date.now(),
      name: productName,
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];
    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProductName("");
  }

  const handleDeleteProduct = (id: number) => {
    const updatedP = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedP);

    localStorage.setItem("products", JSON.stringify(updatedP));

  }
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white p-4">
        <h1>Users</h1>
        <UserCard name="Damian" age={22} course="FSD" />
        <UserCard name="Bruce" age={35} course="FSD"/>
        <Greeting name="Nip"></Greeting>
      </header>
      <main className="grid grid-cols-2 gap-6 p-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}/>

          <p>Name: {name}</p>
          <div>
            
              <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <br />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
                <br />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <br />
                {errors.email && (
                  <p>{errors.email}</p>
                )}
                <br />
                <button type="submit">
                  Submit
                </button>
              </form>
            </div>
            <br />
            <p>{formData.name}</p>
            <p>{formData.email}</p>
          </section>
        <br />

        <div>
          <button onClick={() => setShowItems(!showItems)}>
            Toggle Items
          </button>

          {showItems? (
            <div>
              
              {items.length > 0 ? (
                <ol className="list-decimal pl-6">
                {items.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
                </ol>
              ) : (
                <p>No Items Available</p>
              )}
              
            </div>
          ) : (
            <p>Items are hidden</p>
          )}
        </div>

        <div>
          <input className="w-full border p-2 rounded mb-3" value={productName}
          onChange={(e) => setProductName(e.target.value)}/>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAddProduct}>Add Product</button>
          <br />
          <p>{productName}</p>
          <br />
          <ol>
            {products.map((product) => (
              <li key={product.id}>{product.name}
              <button onClick={() => handleDeleteProduct(product.id)} style={{marginLeft: "10px"}}>
                Delete
              </button>
              </li>
            ))}
          </ol>
        </div>
        <br />
        <div>
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">API Users</h2>
              {loading && <p>Loading...</p>}

              {error && <p style={{color: "red"}}>{error}</p>}

              <ol className="list-decimal">
                {users.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ol>
          </section>
        </div>
        <Link href="/contact">
            Contact Page
        </Link>
      </main>
      <footer className="bg-slate-800 text-white p-4 text-center">
        <div>
          <h1>Login</h1>

          <input value={email}
          onChange={(e) => setEmail(e.target.value)} />

          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <Counter />
        </div>
      </footer>
    </div>
  );
}
