import { ArrowUpRight, ArrowDownRight, Zap, IndianRupee, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Total Energy Sold',
    value: '21,100 kWh',
    change: '+15%',
    icon: Zap,
    trend: 'up',
  },
  {
    name: 'Total Revenue',
    value: '₹84,400',
    change: '+12%',
    icon: IndianRupee,
    trend: 'up',
  },
  {
    name: 'Avg. Price',
    value: '₹4.00/kWh',
    change: '-2%',
    icon: TrendingUp,
    trend: 'down',
  },
]

export default function EnergyStats() {
  return (
    <div className="flex flex-wrap gap-2  ">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex  items-center justify-between">
            <stat.icon className="h-6 w-6 text-blue-600" />
            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
              {stat.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 inline ml-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 inline ml-1" />
              )}
            </span>
          </div>
          <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
          <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
        </div>
      ))}
    </div>
  )
}

