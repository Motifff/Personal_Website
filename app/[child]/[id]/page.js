import HomeLayout from "@/components/mainPage/layout/homeLayout";

export function generateStaticParams() {
  return [
    { child: 'blog', id: 'detective_retoric' },
    { child: 'blog', id: 'myo_clear_app' },
    { child: 'blog', id: 'enhanced_spine' },
    { child: 'blog', id: 'dimention_smasher' },
    { child: 'blog', id: 'space_poet_project' },
    { child: 'blog', id: 'time_flowing_on_canal' },
    { child: 'blog', id: 'tea_space' },
    { child: 'blog', id: 'untitled_quantum_game' },
    { child: 'blog', id: 'material_movement' },
    { child: 'blog', id: 'lightime' },
    { child: '!blog', id: 'detective_retoric' },
    { child: '!blog', id: 'myo_clear_app' },
    { child: '!blog', id: 'enhanced_spine' },
    { child: '!blog', id: 'dimention_smasher' },
    { child: '!blog', id: 'space_poet_project' },
    { child: '!blog', id: 'time_flowing_on_canal' },
    { child: '!blog', id: 'tea_space' },
    { child: '!blog', id: 'untitled_quantum_game' },
    { child: '!blog', id: 'material_movement' },
    { child: '!blog', id: 'lightime' }
  ];
}

export default function Page({ params }) {
  const { id } = params
  return (
    <div style={{ position: "absolute", top: 0, lett: 0 }}>
      <HomeLayout />
    </div>
  );
}