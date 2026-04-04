import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function GlutathioneIV() {
	const treatment = skinTreatments.find((item) => item.id === 'glutathione-iv')
	return <SkinTreatmentPage treatment={treatment} />
}
