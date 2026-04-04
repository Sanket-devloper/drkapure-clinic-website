import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function AntiAging() {
	const treatment = skinTreatments.find((item) => item.id === 'anti-aging')
	return <SkinTreatmentPage treatment={treatment} />
}
