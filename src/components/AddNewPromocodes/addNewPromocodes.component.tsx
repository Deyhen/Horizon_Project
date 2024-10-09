import { useAppDispatch } from "@/src/store/store"
import { addPromocodes } from "@/src/store/user/actions"
import { useState } from "react"

export const AddNewPromocodes = () => {
    const [newPromocodeName, setNewPromocodeName] = useState('')
    const [newPromocodeDonateBonus, setNewPromocodeDonateBonus] = useState(0)
    const [newPromocodeGameBonus, setNewPromocodeGameBonus] = useState(0)
    const [newPromocodesAmount, setNewPromocodesAmount] = useState(0)

    const dispatch = useAppDispatch()

    const handleSetNewPromocodes = () =>{
        dispatch(addPromocodes({
            name: newPromocodeName,
            gameCurrencyBonus: newPromocodeGameBonus, 
            donateCurrencyBonus: newPromocodeDonateBonus, 
            amount: newPromocodesAmount
        }))
    }

    return (
        <div>
        add promocodes
        <input type="text" value={newPromocodeName} onChange={(e) => setNewPromocodeName(e.target.value)}/>
        <input type="number" value={newPromocodeDonateBonus} onChange={(e) => setNewPromocodeDonateBonus(e.target.valueAsNumber)}/>
        <input type="number" value={newPromocodeGameBonus} onChange={(e) => setNewPromocodeGameBonus(e.target.valueAsNumber)}/>
        <input type="number" value={newPromocodesAmount} onChange={(e) => setNewPromocodesAmount(e.target.valueAsNumber)}/>
        <button onClick={handleSetNewPromocodes}>send</button>
      </div>
    )
}