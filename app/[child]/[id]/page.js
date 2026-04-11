import HomeLayout from "@/components/mainPage/layout/homeLayout";

export function generateStaticParams() {
  return [
    { child: 'home', id: 'mock_test_post' },
    { child: 'home', id: 'grad_design_2025' },
    { child: 'home', id: 'qwen_chat_mock' },
    { child: 'home', id: 'undergrad_design_2023' },
    { child: 'home', id: 'portfolio_2023' },
    { child: 'home', id: 'detective_retoric' },
    { child: 'home', id: 'myo_clear_app' },
    { child: 'home', id: 'enhanced_spine' },
    { child: 'home', id: 'dimention_smasher' },
    { child: 'home', id: 'space_poet_project' },
    { child: 'home', id: 'time_flowing_on_canal' },
    { child: 'home', id: 'tea_space' },
    { child: 'home', id: 'untitled_quantum_game' },
    { child: 'home', id: 'material_movement' },
    { child: 'home', id: 'lightime' },
    { child: '!home', id: 'mock_test_post' },
    { child: '!home', id: 'grad_design_2025' },
    { child: '!home', id: 'qwen_chat_mock' },
    { child: '!home', id: 'undergrad_design_2023' },
    { child: '!home', id: 'portfolio_2023' },
    { child: '!home', id: 'detective_retoric' },
    { child: '!home', id: 'myo_clear_app' },
    { child: '!home', id: 'enhanced_spine' },
    { child: '!home', id: 'dimention_smasher' },
    { child: '!home', id: 'space_poet_project' },
    { child: '!home', id: 'time_flowing_on_canal' },
    { child: '!home', id: 'tea_space' },
    { child: '!home', id: 'untitled_quantum_game' },
    { child: '!home', id: 'material_movement' },
    { child: '!home', id: 'lightime' }
  ];
}

export default function Page({ params }) {
  const { id } = params
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
      <HomeLayout />
    </div>
  );
}