import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import classess from './FoodsAdminPage.module.css'
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';

export default function FoodsAdminPage() {
    const [foods, setFoods] = useState();
    const { searchTerm } = useParams();
    const loadFoods = async () => {
        const foods = searchTerm ? await search(searchTerm) : await getAll();
        setFoods(foods);
    }
    useEffect(() => {
        loadFoods()
    }, [searchTerm])
    const FoodsNotFound = () => {
        if (foods && foods.length > 0) return;
        return searchTerm ? (<NotFound linkRoute='/admin/foods' linkText='Show All' />) : (<NotFound linkRoute='/dashboard' linkText='Back to Dashboard' />)
    }
    const deleteFood = async food => {
        const confirmed = window.confirm(`Delete Food ${food.name}`)
        if (!confirmed) return;
        await deleteById(food.id);
        toast.success(`"${food.name}" Has Been Remove!`);
        setFoods(foods.filter(f => f.id !== food.id))
    }

    return (
        <div className={classess.container}>
            <div className={classess.list}>
                <Title title='Manage Foods' margin='1rem auto' />
                <Search searchRoute='/admin/foods/'
                    defaultRoute='/admin/foods'
                    margin='1rem 0' placeholder='Search Foods !'/>
                <Link to='/admin/addFood' className={classess.add_food}>Add Food +</Link>
                <FoodsNotFound />
                {
                    foods &&
                    foods.map(food =>
                        <div key={food.id} className={classess.list_item}>
                            <img src={food.imageUrl} alt={food.name} />
                            <Link to={'/food/' + food.id}>{food.name}</Link>
                            <Price price={food.price} />
                            <div className={classess.actions}>
                                <Link to={'/admin/editFood/' + food.id}>Edit</Link>
                                <Link onClick={() => deleteFood(food)}>Delete</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
